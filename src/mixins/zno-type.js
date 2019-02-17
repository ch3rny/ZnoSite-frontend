export const getZnoType = {
	methods: {
		getZnoType: type =>
			type == 1 ? 'Основна сесія' : type == 2 ? 'Пробне ЗНО' : 'Додаткова сесія'
	}
};
