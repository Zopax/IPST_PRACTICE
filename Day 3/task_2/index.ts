async function SendHttpRequest (url: string): Promise<any> {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } 
    catch (error) {
      console.error("Ошибка при загрузке данных:", error);
      throw error;
    }
}

const apiUrl: string = "https://catfact.ninja/fact";
const apiUrlError: string = "https://catfact.ninja/fact3f";

SendHttpRequest(apiUrl).then((data) => {
    console.log("Данные получены:", data);
});