"use strict";

let number=0;
const bbs = document.querySelector('#bbs');

document.querySelector('#post').addEventListener('click', () => {
    const name = document.querySelector('#name').value;
    const message = document.querySelector('#message').value;

    const params = {  // URL Encode
        method: "POST",
        body:  'name='+name+'&message='+message,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    console.log( params );
    const url = "/post";
    fetch( url, params )
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        console.log( response );
        document.querySelector('#message').value = "";
        PostCount();
        
    });
});



document.querySelector('#check').addEventListener('click', () => {
    const params = {  // URL Encode
        method: "POST",
        body:  '',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    const url = "/check";
    fetch( url, params )
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        let value = response.number;
        console.log( value );
        document.querySelector('#post-count').innerText = `投稿数: ${value}`;

        console.log( number );
        if( number != value ) {
            const params = {
                method: "POST",
                body: 'start='+number,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'               
                }
            }
            const url = "/read";
            fetch( url, params )
            .then( (response) => {
                if( !response.ok ) {
                    throw new Error('Error');
                }
                return response.json();
            })
            .then( (response) => {
                number += response.messages.length;
                for( let mes of response.messages ) {
                    console.log( mes );  // 表示する投稿
                    let cover = document.createElement('div');
                    cover.className = 'cover';
                    let name_area = document.createElement('span');
                    name_area.className = 'name';
                    name_area.innerText = mes.name;
                    let mes_area = document.createElement('span');
                    mes_area.className = 'mes';
                    mes_area.innerText = mes.message;
                    let deleteButton = document.createElement('button');
                    deleteButton.className = 'button';
                    deleteButton.innerText = '削除';
                    deleteButton.onclick = () => deletePost(mes.id);
                    let updateButton = document.createElement('button');
                    updateButton.className = 'button';
                    updateButton.innerText = '更新';
                    updateButton.onclick = () => updatePost(mes.id);
                    cover.appendChild( name_area );
                    cover.appendChild( mes_area );
                    cover.appendChild(deleteButton);
                    cover.appendChild(updateButton);

                    bbs.appendChild( cover );
                }
            })
        }
    });
});

function deletePost(id) {
    const url = `/bbs/${id}`;
    fetch(url, { method: 'DELETE' })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('投稿が削除されました');
                const postToDelete = document.querySelector(`.cover[data-id='${id}']`);
                if (postToDelete) {
                    postToDelete.remove(); 
                }
            } else {
                alert('削除に失敗しました: ' + data.message);
            }
        })
        .catch(err => {
            console.error('削除エラー:', err);
            alert('削除時にエラーが発生しました');
        });
}

function updatePost(id) {
    const name = document.querySelector('#name').value;
    const message = document.querySelector('#message').value;
    console.log(`更新リクエスト: id=${id}, name=${name}, message=${message}`);

    const params = {
        method: "PUT",
        body: `message=${message}&name=${name}`, 
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    const url = `/bbs/${id}`; 
    console.log(`PUTリクエスト送信先: ${url}`); 

    fetch(url, params)
        .then(response => {
            if (!response.ok) {
                throw new Error(`サーバーエラー: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                alert('投稿が更新されました');
                const postToUpdate = document.querySelector(`.cover[data-id='${id}']`);
                if (postToUpdate) {
                    postToUpdate.querySelector('.name').innerText = name;
                    postToUpdate.querySelector('.mes').innerText = message;
                }
                
            } else {
                alert('更新に失敗しました: ' + data.message);
            }
        })
        .catch(err => {
            console.error('更新エラー:', err);  
            alert('更新時にエラーが発生しました: ' + err.message);
        });
}



  function PostCount() {
    const params = {
        method: "POST",
        body: '',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    const url = "/check";  
    fetch(url, params)
        .then((response) => {
            if (!response.ok) {
                throw new Error('投稿数取得エラー');
            }
            return response.json();
        })
        .then((response) => {
            const postCount = response.number;  
            document.querySelector('#post-count').innerText = postCount;  
        })
        .catch((error) => {
            console.error("投稿数取得エラー:", error);
        });
}

  

    