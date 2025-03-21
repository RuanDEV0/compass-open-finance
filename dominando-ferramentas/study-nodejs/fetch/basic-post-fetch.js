const body = {
    title: "foo",
    body: "bar",
    userId: 1
};



async function main(){
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
            "User-Agent": "undici-stream-example",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    const data = await response.json();
    console.log(data);
}

main().catch(console.error);