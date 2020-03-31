import classes from "./Input.module.css";

const Input = props => {
	let label = null;
	if (props.label) {
		if (props.id) {
			label = (
				<label htmlFor={props.id} className={classes.Label}>
					{props.label}
				</label>
			);
		} else {
			label = <label className={classes.Label}>{props.label}</label>;
		}
	}

	let textInputClasses = [classes.TextInput];
	let error = null;
	if (props.error) {
		error = <p className={classes.ErrorMessage}>{props.error}</p>;
		textInputClasses.push(classes.Error);
	}

	let inputElement = null;
	switch (props.element) {
		case "text":
			inputElement = (
				<input type="text" className={textInputClasses.join(" ")} {...props} />
			);
			break;
		case "textarea":
			inputElement = (
				<textarea className={textInputClasses.join(" ")} {...props} />
			);
			break;
		case "radio":
			const { itemList = [] } = props;
			inputElement = itemList.map((item, index) => {
				const id = `${item.name}_${item.value}`;
				return (
					<div className={classes.Radio} key={index}>
						<input type="radio" {...item} id={id} />
						<label htmlFor={id}>{item.title}</label>
					</div>
				);
			});
			break;
		default:
			inputElement = (
				<input type="text" className={textInputClasses.join(" ")} {...props} />
			);
			break;
	}

	const useClasses = [classes.Input]
	if (props.addclass) {
		useClasses.push(props.addclass)
	}

	return (
		<div className={useClasses.join(' ')}>
			{label}
			{error}
			{inputElement}
		</div>
	);
};

export default Input;
