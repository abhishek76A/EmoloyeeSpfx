import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IEmployeeManagementProps } from './components/IEmployeeManagementProps';
import EmployeeManagement from './components/EmployeeManagement';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

export default class EmployeeManagementWebPart extends BaseClientSideWebPart<IEmployeeManagementProps> {
  public render(): void {
    const element: React.ReactElement<IEmployeeManagementProps> = React.createElement(
      EmployeeManagement,
      {
        context: this.context
      }
    );

    ReactDOM.render(element, this.domElement);
  }
}
