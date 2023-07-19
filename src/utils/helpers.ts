import { utils, write, read } from 'xlsx';
import { saveAs } from 'file-saver';
export const exportCSV = (data: unknown[], fileName: string = 'data') => {
    const worksheet = utils.json_to_sheet(data);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer = write(workbook, { bookType: 'xlsx', type: 'array' });
    const fileData = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(fileData, `${fileName}.xlsx`);
}


export function parseCSV(content: any): any[] {
    const lines = content.split('\n');
    const data = [];

    for (let i = 1; i < lines.length; i++) {
        const fields = lines[i].split(',');
        data.push(fields);
    }
    return data
}

export function parseExcel(content: any) {
    const workbook = read(content, { type: 'binary' });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = utils.sheet_to_json(worksheet, { header: 1 });
    return data
}


export function parseFile(content: any, type: 'csv' | 'xlsx' | 'xls'): any[] {
    const parseMapper = {
        'csv': parseCSV,
        'xlsx': parseExcel,
        'xls': parseExcel,
    }
    return parseMapper[type](content)
}



export function can(functionName: string): boolean {
    const permissions = atob(localStorage.getItem('permissions') as string)
    console.log(permissions)
    console.log(permissions.includes(functionName))
    console.log(functionName)
    return permissions.includes(functionName)
}