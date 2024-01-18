const validator = {


        // rejette les champs de formulaires vides.
        // et indique quel champ est manquant  
        // @param { object }
        // @return array

        validateFields: (fields) => {
            const errors = [];
            for (const [fieldName, fieldValue] of Object.entries(fields)) {
                if (!fieldValue) {
                    errors.push(`Le champ ${fieldName} est obligatoire`);
                }
            }
            return errors;
        },
    

};

module.exports = validator;