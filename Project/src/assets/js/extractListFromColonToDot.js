const extractListFromColonToDot = (article)=>{
    if(!article || !article.content) 
        return article;
    const content= article.content;
    const colonIndex = content.indexOf(":");

    //tìm dấu "." đầu tiên sau dấu ":"
    const dotAfterColonIndex = content.indexOf(".",colonIndex);

    if(colonIndex === -1 || dotAfterColonIndex === -1){
        return article; //không xử lí nếu kh có dấu ":" hoặc "."
    }

    const intro = content.substring(0, colonIndex +1).trim(); 
    const listPart = content.substring(colonIndex +1, dotAfterColonIndex).trim();
    const outro = content.substring(dotAfterColonIndex +1).trim();

    //cắt chuỗi theo dấu ","
    const listItems = listPart.split(",").map((item)=> item.trim());

    return{
        ...article,
        intro,
        listItems,
        outro,
    };
};
export default extractListFromColonToDot;