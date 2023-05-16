import ButtonCss from "./Button.module.css";

const Button = ({ onClick }) => {
	return (
		<button className={ButtonCss.button} type="button" onClick={onClick}>
			X
		</button>
	);
};

export default Button;
