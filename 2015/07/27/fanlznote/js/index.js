// author:fanlz 
// 2017.07.27

    var storage = window.localStorage;

    function updateStorage() {
        storage.catalog = JSON.stringify(data.catalog);
        storage.notes = JSON.stringify(data.notes);
    }
    function getStorage() {
        data.catalog = JSON.parse(storage.catalog);
        data.notes = JSON.parse(storage.notes);
    }
    if(storage.catalog != undefined) {
        getStorage();
    } else {
        updateStorage();
    }
    // 目录
    function renderCatalog() {
        var liHtml = '';
        for (var i = 0; i < data.catalog.length; i++) {
            if (data.catalog[i].pid == '-1') {
                var str = '';
                var flag = false;
                for (var j = 0; j < data.catalog.length; j++) {
                    if (data.catalog[i].cid == data.catalog[j].pid) {
                        flag = flag || true;
                    } else {
                        flag = flag || false;
                    }
                }
                str = flag ? 'folder open' : 'file';
                liHtml += '<li data-cid="'+data.catalog[i].cid+'" data-pid="-1" class="'+str+'"><span>'+data.catalog[i].txt+'</span></li>'
            } else {
                liHtml += '<li data-cid="'+data.catalog[i].cid+'" data-pid="'+data.catalog[i].pid+'" class="level2 file"><span>'+data.catalog[i].txt+'</span></li>';
            } 
        }
        $(liHtml).insertBefore('.trash');

        // 二级目录排在对应一级目录的下面
        $('.level2').each(function(index, el) {
            var str = '[data-cid="'+$(this).attr('data-pid')+'"]';
            $(el).insertAfter(str);
        });
    }

    renderCatalog();

    //笔记列表
    function renderNotes(cid) {
        var listHtml = '';
        var notes = [];
        cid = cid ? cid : undefined;
        if (cid != undefined) {
            var notes = [];
            for (var i = 0; i < data.notes.length; i++) {
                if (data.notes[i].pid == cid) {
                    notes.push(data.notes[i]);
                }
            }
        } else {
            notes = data.notes;
        }
        for (var i = 0; i < notes.length; i++) {
            listHtml += '<li data-nid="'+notes[i].nid+'" data-pid="'+notes[i].pid+'" class="list-item">' +
                            '<a href="javascript:void(0);">' +
                                '<div>' +
                                    '<h3>'+notes[i].title+'</h3>' +
                                    '<p><em class="date">'+notes[i].date+'</em>'+notes[i].content+'</p>' +
                                '</div>' +
                            '</a>' +
                        '</li>';
        }
        $('#notes-list').html(listHtml);
        $('#note-title').val('');
        $('#text').val('');
        $('.prev-box').html('');
        $('#notes-list li').first().click();
    }

    renderNotes();
    function noteEdit() {
        $('.edit-box').show();
        $('.prev-box').hide();
        $('.edit').addClass('on');
        $('.preview').removeClass('on');
        $('#text').focus();
    }
    function notePreview() {
        $('.edit-box').hide();
        $('.prev-box').show();
        $('.edit').removeClass('on');
        $('.preview').addClass('on');

        //初始化Markdown解析器
        var md = new Remarkable({
          html:         true,
          breaks:       true,
          langPrefix:   'language-',
          linkify:      true,
          quotes: '“”‘’',
        });
        var str = $('#text').val();
        $('.prev-box').html(md.render(str));
    }

    //编辑预览按钮
    $('.edit').click(function(event) {
        noteEdit();
    });
    $('.preview').click(function(event) {
        notePreview();
    });

    // 自适应高的textarea
    function autoTextarea($ele) {
        var ele = $ele[0];
        var change = function() {
            var scrollTop = $('.article').scrollTop();
            var paddingHeight = parseInt($ele.css('paddingTop')) + parseInt($ele.css('paddingBottom'));
            if(ele.scrollHeight > $ele.height()) {
                ele.style.height = ele.scrollHeight - paddingHeight + 'px';
                scrollTop += parseInt(ele.style.height) - ele.currHeight;
                $('.article').scrollTop(scrollTop);
                ele.currHeight = parseInt(ele.style.height);
            }
        }

        ele.onfocus = change;
        ele.onpropertychange = change;
        ele.oninput = change;
        change();
    }   
    autoTextarea($('#text'));

    $('#notes-list').on('click', '.list-item', function(event) {
        event.preventDefault();
        $('.list-item').removeClass('on');
        $(this).addClass('on');
        var str = $(this).attr('data-nid');
        for(var i = 0; i < data.notes.length; i++) {
            if(data.notes[i].nid == str) {
                $('#note-title').val(data.notes[i].title);
                $('#text').val(data.notes[i].md);

                //转到预览界面
                notePreview();
            }
        }
    });
    $('.catalist').html($('.menu li').not('.folder').not('.trash').clone(false));  
    $('.n-catalog').click(function(event) {
        event.stopPropagation();
        if($('.catalist').is(':hidden')) {
            $('.catalist').show();
        } else {
            $('.catalist').hide();
        }
    });
    $('.n-catalog').on('click', 'li', function(event) {
        event.stopPropagation();
        $('.curcatalog').text($(this).text());
        $('.curcatalog').attr('data-cid',$(this).attr('data-cid'));
        $(this).parent().hide(); 
    });
    $(document).click(function(event) {
        $('.catalist').hide();
    });

    // 点击目录
    $('.menu').on('click', 'li.file', function(event) {
        event.preventDefault();
        $('.all-notes').removeClass('on');
        $('.menu li').removeClass('on');
        $(this).addClass('on');
        $('.listcata span').text($(this).text());
        renderNotes($(this).attr('data-cid'));
    });
    // 文件夹
    $('.menu').on('click', 'li.folder', function(event) {
        event.preventDefault();
        var _this = this;
        $('.menu li').each(function(index, el) {
            if ($(this).attr('data-pid') == $(_this).attr('data-cid')) {
                $(this).toggle();
            }
        });
        if ($(_this).hasClass('open')) {
            $(_this).removeClass('open');
        } else {
            $(_this).addClass('open');
        }
    });
    $('.all-notes').click(function(event) {
        $('.menu li').removeClass('on');
        $(this).addClass('on');
        $('.listcata span').text($(this).text());
        renderNotes();
    });
    function toDouble(n) {
        return n < 10 ? '0'+n : n;
    }
    function nowDate() {
        var date = new Date();
        var y = date.getFullYear(),
            m = date.getMonth() + 1,
            d = date.getDate();
        return y + '-' + toDouble(m) + '-' + toDouble(d);
    }

    //新建笔记
    $('#add-btn').click(function(event) {
        var len = data.notes.length
        data.notes[len] = {};
        data.notes[len].nid = new Date().getTime() +'';
        
        var listHtml = '<li data-nid="'+data.notes[len].nid+'" data-pid="'+$('.curcatalog').attr('data-cid')+'" class="list-item">' +
                            '<a href="javascript:void(0);">' +
                                '<div>' +
                                    '<h3>'+'无标题'+'</h3>' +
                                    '<p><em class="date">'+nowDate()+'</em></p>' +
                                '</div>' +
                            '</a>' +
                        '</li>';
        $(listHtml).insertBefore($('#notes-list .list-item').first());
        $('.list-item').removeClass('on');
        $('#notes-list .list-item').first().addClass('on');
        $('#note-title').val('');
        $('#text').val('');
        $('.prev-box').html('');
        noteEdit();
        saveNote();
    });

    function saveNote() {
        var nid = $('#notes-list .on').attr('data-nid');
        for (var i = 0, len = data.notes.length; i < len; i++) {
            if (data.notes[i].nid == nid) {
                data.notes[i].pid = $('.curcatalog').attr('data-cid');
                data.notes[i].title = $('#note-title').val();
                data.notes[i].md = $('#text').val();
                data.notes[i].content = $('.prev-box').text();
                data.notes[i].date = nowDate(); 
            }
        }
        // 更新本地存储
        updateStorage();
    }

    $('.save').click(function(event) {
        saveNote();
        $('.hint').animate({
            opacity: 1},
            400, function() {
            $('.hint').animate({opacity:0}, 1000);
        });

    });
    $('.delete').click(function(event) {
        var flag = window.confirm('确定要删除:  '+$('#note-title').val()+'  吗?');
        if (flag) {
            var nid = $('#notes-list .on').attr('data-nid');
            for(var i = 0; i < data.notes.length; i++) {
                if(data.notes[i].nid == nid) {
                    data.notes.splice(i,1);
                }
            }
            var str = '.menu [data-cid="'+$('.curcatalog').attr('data-cid')+'"]'
            $(str).click();
        }

        updateStorage();
    });
$(function(){
    $('.all-notes').click();
});