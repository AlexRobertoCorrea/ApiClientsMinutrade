/**
 * Created by alex on 19/04/16.
 */
var constants={
	ERRORS: {
		unknown: {
			code: 1,
			httpStatus: 500,
			desc: 'Erro inesperado'
		},
		unauthorized: {
			code: 2,
			httpStatus: 403,
			desc: 'Não autorizado'
		},
		duplicate_value: {
			code: 3,
			httpStatus: 401,
			desc: 'Valor já existe'
		}
	}
};


//Node.js exports
if (typeof module !== 'undefined' && module.exports) {
	module.exports = constants;
}