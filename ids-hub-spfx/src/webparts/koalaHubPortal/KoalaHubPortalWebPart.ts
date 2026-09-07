import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-webpart-base';
import KoalaHubPortal, { KoalaHubPortalProps } from './KoalaHubPortal';

export interface IKoalaHubPortalWebPartProps {
  description: string;
}

export default class KoalaHubPortalWebPart extends BaseClientSideWebPart<IKoalaHubPortalWebPartProps> {
  public render(): void {
    const element: React.ReactElement<KoalaHubPortalProps> = React.createElement(KoalaHubPortal, {
      description: this.properties.description || 'A single workspace for the work that keeps our teams ready.',
    });
    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
    super.onDispose();
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: { description: 'Koala Hub settings' },
          groups: [
            {
              groupName: 'Portal content',
              groupFields: [
                PropertyPaneTextField('description', { label: 'Portal description' }),
              ],
            },
          ],
        },
      ],
    };
  }
}
