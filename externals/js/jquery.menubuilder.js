(function($){
    var plgs = [
        { name: "Accordion", url: "../accordion/index.html" },
        { name: "BlackoutScroll", url: "../blackoutscroll/index.html" },
        { name: "Blank", url: "../blank/index.html" },
        { name: "BreadCrumb", url: "../breadcrumb/index.html" },
        { name: "BubblePopup", url: "../bubblepopup/index.html" },
        { name: "Dropdown", url: "../dropdown/index.html" },
        { name: "Exticon", url: "../exticon/index.html" },
        { name: "Fontsize", url: "../fontsize/index.html" },
        { name: "ImageOver", url: "../imageOver/index.html" },
        { name: "InnerSlide", url: "../innerslide/index.html" },
        { name: "Konami", url: "../konami/index.html" },
        { name: "OpacityOver", url: "../opacityOver/index.html" },
        { name: "Over", url: "../Over/index.html" },
        { name: "Picmenu", url: "../Picmenu/index.html" },
        { name: "S2V", url: "../s2v/index.html" },
        { name: "Scroller", url: "../scroller/index.html" },
        { name: "Stripe", url: "../stripe/index.html" },
        { name: "Tab", url: "../tab/index.html" },
        { name: "Ticker", url: "../ticker/index.html" },
        { name: "Tooltip", url: "../tooltip/index.html" }
    ];

    $.fn.menuBuilder = function() {
        return this.each(function(){
            var menu = $(this).append("<ul />"), html, tpl = jQuery('<li><a /></li>'), item;
            for(var i in plgs) {
                item = tpl.clone();
                item.find("a").attr("href", plgs[i].url).text(plgs[i].name)
                    .parent("li")
                    .attr("id", "laquu_" + plgs[i].name.toLowerCase()).addClass("laquu-nav-item");
                if(html)
                    html = html.add(item);
                else
                    html = item;
            }
            menu.find("ul").append(html);
        });
    };
})(jQuery);