let BASE_URL = ''


if (process.env.NODE_ENV == 'development') {
    BASE_URL = 'http://127.0.0.1:8180/api' // 开发环境
	//http://127.0.0.1:8180/api
	
} else {
	BASE_URL = 'https://grazut.runrab.com/api' // 生产环境
}
let staticDomainURL = BASE_URL+ '/sys/common/static';

const configService = {
	apiUrl: BASE_URL,
	staticDomainURL: staticDomainURL
};

export default configService
