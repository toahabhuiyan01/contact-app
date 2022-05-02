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
        icon={<RadioButtonUncheckedIcon />}
        checkedIcon={<CheckCircleIcon style={{color: brandColor}} />}
    />
  )
}

export default CheckBoxGlobal;