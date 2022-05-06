export interface functionVoid {
    (): void;
}

export interface ModalProps {
    open: boolean;
    hideBackdrop?: boolean;
    handleOpen: functionVoid;
    handleClose?: functionVoid;
    handleSubmit?: functionVoid;
    submitButtonText?: String;
    children?: JSX.Element|JSX.Element[];
}

export interface CheckboxProps {
    checked: boolean;
    onChange: functionVoid;
}

export interface lol {
    id: Number;
    name: String;
    type: String;
}

export interface tag {
    name: string;
    value?: string;
    remove?: boolean;
    filters?: string;
}

export interface selectTags {
    [key: string]: boolean;
}

export interface tags {
    tags: tag[] | [];
    selectedTags?: selectTags;
    cbSelect?: React.Dispatch<React.SetStateAction<object>>
}

export interface img {
    url: String;
    fullUrl?: String;
    fetchedAt?: String;
}

export interface chat {
    lastMessage: String;
}

export interface Contact {
    id: String;
    accountId: String;
    type: String;
    name: String;
    phoneNumber: String;
    platformNames: String[];
    messagesSent: number;
    messagesReceived: number;
    createdAt: String;
    img?: img;
    assignee?: any;
    tags: tags;

}

export interface Contacts {
    totalCount?: number;
    contacts?: Contact[];
    nextPage?: String;
}

export interface messageSR {
    min: string;
    max: string;
}
