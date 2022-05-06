import Checkbox from '@material-ui/core/Checkbox';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { brandColor } from '../../utils/GlobalConstants';
import { CheckboxProps } from '../../utils/interfaces';

function CheckBoxGlobal(props: CheckboxProps) {
  return (
    <Checkbox
        checked={props.checked}
        onChange={props.onChange}
        icon={<CheckCircleIcon style={{color: "#B6C1D4", width: "20px"}} />}
        checkedIcon={<CheckCircleIcon style={{color: brandColor, width: "20px"}} />}
    />
  )
}

export default CheckBoxGlobal;