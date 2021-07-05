import { createGlobalStyle } from "styled-components";
import HyundaiSansHeadOfficeRegularEot from "./HyundaiSansHeadOffice-Regular.eot";
import HyundaiSansHeadOfficeRegularWoff from "./HyundaiSansHeadOffice-Regular.woff";
import HyundaiSansHeadOfficeRegularWoff2 from "./HyundaiSansHeadOffice-Regular.woff2";
import HyundaiSansHeadOfficeRegularTtf from "./HyundaiSansHeadOffice-Regular.ttf";

export default createGlobalStyle`
    @font-face {
        font-family: 'Hyundai Sans Text Office';
        src: url(${HyundaiSansHeadOfficeRegularEot});
        src: local('Hyundai Sans Text Office'), local('HyundaiSansTextOffice-Regular'),
            url(${HyundaiSansHeadOfficeRegularEot}?#iefix) format('embedded-opentype'),
            url(${HyundaiSansHeadOfficeRegularWoff2}) format('woff2'),
            url(${HyundaiSansHeadOfficeRegularWoff}) format('woff'),
            url(${HyundaiSansHeadOfficeRegularTtf}) format('truetype');
        font-weight: normal;
        font-style: normal;
    }
`;
