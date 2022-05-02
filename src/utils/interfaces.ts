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