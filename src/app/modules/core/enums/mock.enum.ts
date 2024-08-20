/**
 * This enum store the available configuration for the serve
 *
 * - NO_MOCK -> PRODUCTION, nothing is mocked
 * - EXTERNAL_MOCK -> Only external api are mocked, the call to the backend pass
 * - FULL_MOCK -> Everything is mocked
 */
export enum MockEnum {
    NO_MOCK = 'NO_MOCK',
    EXTERNAL_MOCK = 'EXTERNAL_MOCK',
    FULL_MOCK = 'FULL_MOCK',
}
