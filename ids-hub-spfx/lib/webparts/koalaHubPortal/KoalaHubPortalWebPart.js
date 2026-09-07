import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, PropertyPaneTextField } from '@microsoft/sp-webpart-base';
import KoalaHubPortal from './KoalaHubPortal';
export default class KoalaHubPortalWebPart extends BaseClientSideWebPart {
    render() {
        const element = React.createElement(KoalaHubPortal, {
            description: this.properties.description || 'A single workspace for the work that keeps our teams ready.',
        });
        ReactDom.render(element, this.domElement);
    }
    onDispose() {
        ReactDom.unmountComponentAtNode(this.domElement);
        super.onDispose();
    }
    get dataVersion() {
        return Version.parse('1.0');
    }
    getPropertyPaneConfiguration() {
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
