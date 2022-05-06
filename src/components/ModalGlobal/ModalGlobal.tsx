import { Backdrop, Box, Button, Fade, Modal } from '@mui/material';
import { ModalProps } from '../../utils/interfaces';

function ModalGlobal(props: ModalProps) {
    console.log(props);

    const style = {
        position: 'absolute' as 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "fitContent",
        bgcolor: 'background.paper',
        border: '2px solid #000',
        borderRadius: "15px",
        boxShadow: 20,
        pt: 2,
        px: 4,
        pb: 3,
    };

  return (
        <Modal
            hideBackdrop={props.hideBackdrop}
            open={props.open}
            onClose={props.handleClose}
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            sx={{background: "rgba(101,108,133,0.4)"}}
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
        >
            <Fade in={props.open}>
                <Box sx={{ ...style}}>
                    {props.children}

                    {
                        props.handleClose &&
                        <Button onClick={props.handleClose}>Close</Button>
                    }
                    {
                        props.handleSubmit && 
                        <Button onClick={props.handleSubmit}>{props.submitButtonText || "Submit"}</Button>
                    }
                </Box>
            </Fade>
        </Modal>
    )
}

export default ModalGlobal