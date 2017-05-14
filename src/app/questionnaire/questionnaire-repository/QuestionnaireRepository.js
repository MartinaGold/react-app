class QuestionnaireRepository {

    static getFavoriteActivities() {
        return {
            under18: ['Počítačové hry', 'Četba', 'Procházky', 'Diskotéky'],
            above18: ['Studium', 'Seriály', 'Cestování', 'Řízení auta', 'Koncerty'],
            above28: ['Zaměstnání', 'Cyklistika', 'Výlety s dětmi', 'Pivo s přáteli', 'Venčení psa'],
            above45: ['Zahradničení', 'Venčení psa', 'Pivo s přáteli', 'Sledování TV', 'Údržba domu']
        };
    }

    static getAgeCategories() {
        return [
            {
                value: 'under18',
                plaintext: 'Pod 18 let'
            },
            {
                value: 'above18',
                plaintext: '18-27 let'
            },
            {
                value: 'above28',
                plaintext: '28-45 let'
            },
            {
                value: 'above45',
                plaintext: 'Nad 45 let'
            },
        ];
    }

    static submitAnswer(data) {
        console.log(data);
        return new Promise((resolve) => { // mock post request
            resolve();
        });
    }

}

export default QuestionnaireRepository;