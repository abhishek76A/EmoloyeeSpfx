import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';

import EmployeeManagement from './components/EmployeeManagement';
import { IEmployeeManagementProps } from './components/IEmployeeManagementProps';

export interface IEmployeeManagementWebPartProps {}

export default class EmployeeManagementWebPart extends BaseClientSideWebPart<IEmployeeManagementWebPartProps> {
  public render(): void {
    const element: React.ReactElement<IEmployeeManagementProps> = React.createElement(
      EmployeeManagement,
      {
        context: this.context,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: []
    };
  }
}
