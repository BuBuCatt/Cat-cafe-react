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

    searchData(dataPath, id){
        console.log("reading "+dataPath+" from database");
        return http.get(
            `http://localhost/webdev5/PHP_project/paths.php/${dataPath}?id=${id}`,
            {
                headers: {
                    "Content-Type": 'application/json',
                }
            }
        );
    }

    addData(dataPath, data){
        console.log("posting new data on "+dataPath+" database");
        return http.post(
            `http://localhost/webdev5/PHP_project/paths.php/${dataPath}`,
            data
        );
    }

    editData(dataPath, data){
        console.log("editing "+dataPath+" from database");
        return http.post(
            `http://localhost/webdev5/PHP_project/paths.php/${dataPath}`,
            data
        );
    }

    removeData(dataPath, id, sid){
        console.log("deleting "+dataPath+" from database");
        return http.delete(
            `http://localhost/webdev5/PHP_project/paths.php/${dataPath}?id=${id}&sid=${sid}`
        );
    }

}

export default new DataService();