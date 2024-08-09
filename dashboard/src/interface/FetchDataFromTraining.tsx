export const fetchDataFromTraining = async (username: string): Promise<{ success: number }> => {
    try {
        console.log("Fetching data of " + username);

        const userValidationResponse = await fetch('http://localhost:5000/api/training/isuservalid', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username }),
        });

        const userValidationData = await userValidationResponse.json();

        if (userValidationData.success === 0) {
            return { success: 0 };
        }

        const updateTaskListResponse = await fetch('http://localhost:5000/api/training/updatetasklist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username }),
        });

        const updateTaskListData = await updateTaskListResponse.json();

        if (updateTaskListData.success === 0) {
            return { success: 0 };
        }

        const updateUserDataResponse = await fetch('http://localhost:5000/api/training/updateuserdata', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username }),
        });

        const updateUserDataData = await updateUserDataResponse.json();

        if (updateUserDataData.success === 0) {
            return { success: 0 };
        }

        return { success: 1 };

    } catch (error) {
        console.error("There was an error in the request:", error);
        return { success: 0 };
    }
};
