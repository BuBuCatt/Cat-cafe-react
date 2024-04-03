import http from "../http-common";
class FileService{
    read(fileName){
        console.log("reading file "+fileName);
        return http.get(`/data/${fileName}.json`);
    }
}

export default new FileService();