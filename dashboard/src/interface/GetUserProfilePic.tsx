export const getUserProfilePic = async (username: string): Promise<string> => {
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

            if (data && data.image) {
                return data.image;
            } else {
                return 'invalid_user.png';
            }
        } else {
            return 'invalid_user.png';
        }
    } catch (error) {
        return 'invalid_user.png';
    }
};
