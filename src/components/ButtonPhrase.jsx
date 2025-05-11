const ButtonPhrase = ({ handlePhrase }) => {


	return (
		<div className='button'>
        <button className="app__btn" onClick={handlePhrase}>
			Ver otra vez
		</button>
      </div>
	)
};

export default ButtonPhrase;
