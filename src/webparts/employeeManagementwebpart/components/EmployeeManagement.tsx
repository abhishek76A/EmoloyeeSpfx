import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  TextField,
  Dropdown,
  PrimaryButton,
  DatePicker,
  IDropdownOption,
} from '@fluentui/react';
import { PeoplePicker, PrincipalType } from '@pnp/spfx-controls-react/lib/controls/peoplepicker';
import { SPFI } from '@pnp/sp';
import { getSP } from '../../../pnpjsConfig';
import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';
import { IEmployeeManagementProps } from './IEmployeeManagementProps';

interface EmployeeData {
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

    // Cleanup function to avoid memory leaks
    return () => {
      setSP(null);
    };
  }, [context]);

  const handleInputChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ): void => {
    const { name } = e.currentTarget;
    setEmployeeData((prev) => ({ ...prev, [name]: newValue || '' }));
  };

  const handlePeoplePicker = (items: { secondaryText?: string }[]): void => {
    if (items.length > 0) {
      setEmployeeData((prev) => ({
        ...prev,
        contactInfo: items[0].secondaryText || '',
      }));
    }
  };

  const saveEmployee = async (): Promise<void> => {
    if (!sp) {
      console.error('SP instance is not initialized');
      return;
    }

    try {
      await sp.web.lists.getByTitle('EmployeeDetails').items.add(employeeData);
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
        context={context}
        titleText="Contact Info"
        personSelectionLimit={1}
        principalTypes={[PrincipalType.User]}
        onChange={handlePeoplePicker}
      />
      <Dropdown
        label="Department"
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
