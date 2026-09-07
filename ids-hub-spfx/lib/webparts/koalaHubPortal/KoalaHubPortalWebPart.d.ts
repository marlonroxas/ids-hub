import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, IPropertyPaneConfiguration } from '@microsoft/sp-webpart-base';
export interface IKoalaHubPortalWebPartProps {
    description: string;
}
export default class KoalaHubPortalWebPart extends BaseClientSideWebPart<IKoalaHubPortalWebPartProps> {
    render(): void;
    protected onDispose(): void;
    protected get dataVersion(): Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
