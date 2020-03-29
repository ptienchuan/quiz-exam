import styles from './IconButton.module.css'
import { 
    IoMdRewind,
    IoMdFastforward,
    IoMdRefresh,
    IoMdExpand,
    IoMdContract,
    IoMdClose,
    IoMdCreate,
    IoMdAdd,
    IoMdArrowUp,
    IoMdArrowDown,
} from 'react-icons/io'

const IconButton = props => {
    let icon = null
    switch (props.icon) {
        case 'back':
            icon = <IoMdRewind size="20"/>
            break;
        case 'forward':
            icon = <IoMdFastforward size="20"/>
            break;
        case 'restart':
            icon = <IoMdRefresh size="20"/>
            break;
        case 'full':
            icon = <IoMdExpand size="20"/>
            break;
        case 'unfull':
            icon = <IoMdContract size="20"/>
            break;
        case 'close':
            icon = <IoMdClose size="20"/>
            break;
        case 'edit':
            icon = <IoMdCreate size="20"/>
            break;
        case 'add':
            icon = <IoMdAdd size="20"/>
            break;
        case 'up':
            icon = <IoMdArrowUp size="20"/>
            break;
        case 'down':
            icon = <IoMdArrowDown size="20"/>
            break;
    }

    let useStyles = [styles.IconButton]
    if (props.color) {
        useStyles.push(styles[props.color])
    }

    useStyles = props.addClass ? useStyles.concat(props.addClass) : useStyles

    return (
        <button
            className={useStyles.join(' ')}
            onClick={props.clicked}
            disabled={props.disabled}
            title={props.tooltip}
        >
            {icon}
        </button>
    )
}

export default IconButton