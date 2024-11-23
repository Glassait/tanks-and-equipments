import type { FoldIcon } from '../../atomic/icon/icons-ts/icon.model';

export type SelectItem = {
    text: string;
    icon?: FoldIcon;
    selectedByDefault?: boolean;
};
