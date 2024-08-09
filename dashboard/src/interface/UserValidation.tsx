export const validateUsername = async (username: string): Promise<number> => {
    try {
        console.log(username);
        console.log(JSON.stringify({ "username": username }));
        const response = await fetch('http://localhost:5000/api/training/isuservalid', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "username": username })
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data); // Log dell'intera risposta per debugging
            return data.success ? 1 : 0; // Usa `success` per determinare se il username è valido
        } else {
            return 0;
        }
    } catch (error) {
        console.error('Errore nella richiesta POST:', error);
        return 0;
    }
};
