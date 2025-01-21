import * as React from 'react';
import { useState, useEffect } from 'react';
import { TextField, Dropdown, PrimaryButton, DatePicker, IDropdownOption } from '@fluentui/react';
import { PeoplePicker, PrincipalType } from '@pnp/spfx-controls-react/lib/controls/peoplepicker';
import { SPFI } from '@pnp/sp';
import { getSP } from '../../../pnpjsConfig';
import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';
import { spfx } from '@pnp/spfx';
import { IPersonaProps } from '@fluentui/react';
import { IEmployeeManagementProps } from './IEmployeeManagementProps';

// Step 1: Define the interface for employee data.
interface EmployeeData {
  title: string;
  employeeName: string;
  employeeId: string;
  contactInfo: string;
  department: string;
  designation: string;
  salary: number;
  address: string;
  dateOfJoining?: Date;
}

const EmployeeManagement: React.FC<IEmployeeManagementProps> = ({ context }) => {
  const [sp, setSP] = useState<SPFI | null>(null);
  const [employeeData, setEmployeeData] = useState<EmployeeData>({
    title: '',
    employeeName: '',
    employeeId: '',
    contactInfo: '',
    department: '',
    designation: '',
    salary: 0,
    address: '',
    dateOfJoining: undefined,
  });

  const departmentOptions: IDropdownOption[] = [
    { key: 'HR', text: 'HR' },
    { key: 'IT', text: 'IT' },
    { key: 'Finance', text: 'Finance' },
  ];

  const designationOptions: IDropdownOption[] = [
    { key: 'Manager', text: 'Manager' },
    { key: 'Developer', text: 'Developer' },
    { key: 'Analyst', text: 'Analyst' },
  ];

  useEffect(() => {
    const spInstance = getSP(context);
    setSP(spInstance);
  }, [context]);

  const handleInputChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ): void => { // Added return type 'void'
    const { name } = e.currentTarget;
    setEmployeeData((prev) => ({ ...prev, [name]: newValue || '' }));
  };

  const handlePeoplePicker = (items: IPersonaProps[]): void => { // Added return type 'void'
    if (items.length > 0) {
      setEmployeeData((prev) => ({
        ...prev,
        contactInfo: items[0].secondaryText || '',
      }));
    }
  };

  const saveEmployee = async (): Promise<void> => { // Added return type 'Promise<void>'
    if (!sp) {
      console.error('SP instance is not initialized');
      return;
    }

    try {
      const dataToSave = { ...employeeData, title: employeeData.employeeName };
      await sp.web.lists.getByTitle('EmployeeDetails').items.add(dataToSave);
      alert('Employee saved successfully!');
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };

  return (
    <div>
      <h2>Employee Management</h2>
      <TextField
        label="Employee Name"
        name="employeeName"
        value={employeeData.employeeName}
        onChange={handleInputChange}
      />
      <TextField
        label="Employee ID"
        name="employeeId"
        value={employeeData.employeeId}
        onChange={handleInputChange}
      />

      <PeoplePicker
        context={{
          absoluteUrl: context.pageContext.web.absoluteUrl,
          msGraphClientFactory: context.msGraphClientFactory,
          spHttpClient: context.spHttpClient,
        }}
        titleText="Contact Info (Select Employee)"
        personSelectionLimit={1}
        principalTypes={[PrincipalType.User]}
        onChange={handlePeoplePicker}
      />

      <Dropdown
        label="Department"
        placeholder="Select a department"
        options={departmentOptions}
        selectedKey={employeeData.department}
        onChange={(e, option) =>
          setEmployeeData((prev) => ({
            ...prev,
            department: option?.key as string,
          }))
        }
      />
      <Dropdown
        label="Designation"
        placeholder="Select a designation"
        options={designationOptions}
        selectedKey={employeeData.designation}
        onChange={(e, option) =>
          setEmployeeData((prev) => ({
            ...prev,
            designation: option?.key as string,
          }))
        }
      />
      <TextField
        label="Salary"
        name="salary"
        type="number"
        value={employeeData.salary.toString()}
        onChange={(e, newValue) =>
          setEmployeeData((prev) => ({
            ...prev,
            salary: parseFloat(newValue || '0'),
          }))
        }
      />
      <TextField
        label="Address"
        name="address"
        multiline
        value={employeeData.address}
        onChange={handleInputChange}
      />

      <DatePicker
        label="Date of Joining"
        value={employeeData.dateOfJoining}
        onSelectDate={(date) =>
          setEmployeeData((prev) => ({
            ...prev,
            dateOfJoining: date || undefined,
          }))
        }
      />

      <PrimaryButton text="Save Employee" onClick={saveEmployee} />
    </div>
  );
};

export default EmployeeManagement;
