import * as React from 'react';
import type { IEmployeeManagementwebpartProps } from './IEmployeeManagementwebpartProps';
import EmployeeManagement from './EmployeeManagement';
import { WebPartContext } from '@microsoft/sp-webpart-base';

export default class EmployeeManagementwebpart extends React.Component<IEmployeeManagementwebpartProps> {
  public render(): React.ReactElement<IEmployeeManagementwebpartProps> {
   
    return (
      <section>
        <EmployeeManagement context={new WebPartContext}/>
      </section>
    );
  }
}
