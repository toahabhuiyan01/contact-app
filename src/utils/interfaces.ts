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
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
    cbSelect?: React.Dispatch<React.SetStateAction<selectTags>>;
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
    id: string;
    accountId: string;
    type: string;
    name: string;
    phoneNumber: string;
    platformNames: string[];
    messagesSent: number;
    messagesReceived: number;
    createdAt: string;
    img?: string | null;
    assignee?: any;
    tags: tag[];

}

export interface SinglePerson {
    contact?: Contact;
    selectedContacts?: selectTags;
    onSelectRemove?: React.Dispatch<React.SetStateAction<selectTags>>;
    setTotalSelected?: React.Dispatch<React.SetStateAction<number>>;
}

export interface Contacts {
    totalCount?: number;
    contacts?: Contact[];
    nextPage?: string;
}

export interface queryObject {
    returnTotalCount?: boolean;
    maxMessagesRecv?: number | string;
    minMessagesRecv?: number | string;
    maxMessagesSent?: number | string;
    minMessagesSent?: number | string;
    tags?: string[];
    notTags?: string[];
    q?: string;
    page?: string;
}

export interface messageSR {
    min: string;
    max: string;
}
