interface SignedURLResponse {
    uploadUrl: string;
    publicUrl: string;
    exists?: boolean;
}

async function computeFileHash(file: File): Promise<string> {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function uploadToR2(file: File): Promise<{ publicUrl: string, fileHash: string }> {
    if (!file) {
        throw new Error("No file selected for upload.");
    }

    try {
        const fileHash = await computeFileHash(file);
        const filename = encodeURIComponent(file.name);
        console.log("fileHash", fileHash);
        const signedUrlRes = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_API_URL}/v1/upload/sign-url?filename=${filename}&contentType=${file.type}&hash=${fileHash}`, {
            method: 'GET',
            credentials: 'include',
        });

        console.log("signed url res",signedUrlRes);

        if (!signedUrlRes.ok) {
            const errorData = await signedUrlRes.json();
            throw new Error(`Failed to get signed URL: ${errorData.error || signedUrlRes.statusText}`);
        }

        const response = await signedUrlRes.json();
        const {uploadUrl, publicUrl, exists}: SignedURLResponse = response.result;
        console.log(exists);

        if (exists) {
            console.log("File already exists in system, skipping upload.");
            return {publicUrl, fileHash};
        }
        console.log("upload url",uploadUrl);
        const uploadRes = await fetch(uploadUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': file.type,
            },
            body: file,
        });


        if (!uploadRes.ok) {
            console.log("Debug URL:", uploadRes);
            console.log("Status Code:", uploadRes.status);
            throw new Error(`Failed to upload file to R2: ${uploadRes.statusText}`);
        }

        console.log("signed url:", uploadUrl);
        console.log("File uploaded successfully to R2:", publicUrl);
        return {publicUrl, fileHash};

    } catch (error: any) {
        console.error("Error during R2 upload:", error);
        throw new Error(`Image upload failed: ${error.message}`);
    }
}