// 用于存放待上传的多个文件对象，将该数组中的文件对象传给后端即可
let fileData = [];

let fileList = document.querySelector('.file-list');

// 点击删除选择的文件时的操作
fileList.addEventListener('click', e => {
  if (e.target.className !== 'delete-file') {
    return;
  }
  let deleteIndex = e.target.dataset.index;
  fileData.splice(deleteIndex, 1);
  fileDataToList();
});

let fileInput = document.querySelector('#fileInput');
// input的value改变时，将文件对象加到fileData
fileInput.addEventListener('change', () => {
  fileData.push(fileInput.files[0]);
  // 防止用户连续上传两个相同的文件而不能识别，每次拿到文件对象后，将input的value设为''
  fileInput.value = '';
  // 重新渲染文件列表
  fileDataToList();
}, false);

let upload = document.querySelector('#upload');
upload.addEventListener('click', () => {
  console.log(fileData);
  alert('请打开控制台查看待上传的文件对象数组');
});

// 将fileData渲染成文件列表，直接用Vue或React的列表渲染即可
function fileDataToList () {
  fileList.innerHTML = fileData.reduce((htmlString, file, index) => {
    let fileItem = document.createElement('div');
    fileItem.className = 'file-item';
    fileItem.innerHTML = `<span
                            class='file-name'
                            title=${file.name}>
                            ${file.name}</span>
                          <span
                            class='delete-file'
                            data-index=${index}>
                            x</span>`;
    return htmlString + fileItem.outerHTML;
  }, '');
}
