import http from "../http-common";
class DataService{
    getData(dataPath){
        console.log("reading "+dataPath+" from database");
        return http.get(
            `http://localhost/webdev5/PHP_project/paths.php/${dataPath}`,
            {
                headers: {
                    "Content-Type": 'application/json',
                }
            }
        );
    }

    addData(dataPath, data){
        console.log("reading "+dataPath+" from database");
        return http.post(
            `http://localhost/webdev5/PHP_project/paths.php/${dataPath}`,
            {
                headers: {
                    "Content-Type": 'application/json',
                },
                body: {
                    data: data
                }
            }
        );
    }
}

export default new DataService();