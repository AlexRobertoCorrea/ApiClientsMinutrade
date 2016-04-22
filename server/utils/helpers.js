/**
 * Created by alex on 19/04/16.
 */

function verifyCPF(cpf){
	var Sum;
	var Rest;
	if(/([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/.test(cpf))
	{
		Sum = 0;
		if (cpf == "00000000000")
			return false;
		for (var i=1; i<=9; i++)
			Sum = Sum + parseInt(cpf.substring(i-1, i)) * (11 - i);
		Rest = (Sum * 10) % 11; if ((Rest == 10) || (Rest == 11))
		Rest = 0;
		if (Rest != parseInt(cpf.substring(9, 10)) )
			return false;
		Sum = 0;
		for (i = 1; i <= 10; i++)
			Sum = Sum + parseInt(cpf.substring(i-1, i)) * (12 - i);
		Rest = (Sum * 10) % 11; if ((Rest == 10) || (Rest == 11))
		Rest = 0;
		return !(Rest != parseInt(cpf.substring(10, 11) ) );
	}
	return false;
}

function verifyPhoneNumber(phone_numbers) {
	//xx xxxxx xxxx || xx xxxx xxxx
	for (var i = 0; i < phone_numbers.length; i++)
	{
		if(!(phone_numbers[i][2]=='9'?/[0-9]{2}[9][0-9]{8}/.test(phone_numbers[i]):/[0-9]{2}[0-9]{8}/.test(phone_numbers[i])))
			return false;
	}
	return true;
}

function verifyEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

module.exports={
	verifyCPF:verifyCPF,
	verifyPhoneNumber:verifyPhoneNumber,
	verifyEmail:verifyEmail
};