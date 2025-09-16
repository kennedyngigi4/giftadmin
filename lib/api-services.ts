

export const ApiServices = {
    async post(url: string, token: string, formData: FormData): Promise<any>{
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/${url}`, {
                method: "POST",
                body: formData,
                headers: {
                    "Authorization": `Token ${token}`
                }
            })
            const data = await res.json();

            if (res.ok) {
                return data;
            }
        } catch (e) {
            return { "success": false, "message": e }
        }
    },


    async get(url: string, token: string): Promise<any> {
        try{
            const res = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/${url}`, {
                method: "GET",
                headers: {
                    "Authorization": `Token ${token}`
                }
            })
            const data = await res.json();

            if (res.ok) {
                return data;
            }
        } catch(e){
            return { "success": false, "message": e }
        }
    },

    async patch(url: string, accessToken: string, formData: any): Promise<any> {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/${url}`, {
                method: "PATCH",
                headers: {
                    'Authorization': `Token ${accessToken}`,
                },
                body: formData
            })
            const data = await res.json();
            if (res.ok) {
                return data;
            }
        } catch (e) {
            return { "success": false, "message": e }
        }
    },

}

