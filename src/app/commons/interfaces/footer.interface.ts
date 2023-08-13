export interface FooterInterface {
    showChangelog: boolean;
    showAgreement: boolean;
}

export const INITIAL_STATE_FOOTER: FooterInterface = {
    showAgreement: true,
    showChangelog: true,
};
