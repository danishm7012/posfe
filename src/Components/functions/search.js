export default function searchTailor(query, data, from) {
    // alert(from)
    // alert(JSON.stringify(data))

    var re = new RegExp(query.toUpperCase(), 'g');
    var temp1 = []
    if (from == 'stock') {
        // alert('in stock')
        data.map((x) => {
            if (x.product_name.toUpperCase().match(re) != null || x.supplier_name.toUpperCase().match(re) != null || x.buy_date.toUpperCase().match(re) != null) {
                temp1.push(x)
            }
        })
    }
    if (from == 'supplier' || from == 'customer') {
        // alert('in customer')
        data.map((x) => {
            let name = x.supplier_name ? x.supplier_name : x.customer_name
            // alert(name)
            if (x.address.toUpperCase().match(re) != null || name.toUpperCase().match(re) != null) {
                // alert('hewre')
                temp1.push(x)
            }
        })
    }
    if (from == 'cat') {
        // alert(JSON.stringify(data))
        data.map((x) => {

            // alert(name)
            if (x.barcode.toUpperCase().match(re) != null || x.product_name.toUpperCase().match(re) != null || x.category.toUpperCase().match(re) != null || x.details.toUpperCase().match(re) != null) {
                // alert('hewre')
                temp1.push(x)
            }
        })
    }
    if (from == 'invoice') {
        // alert(JSON.stringify(data))
        data.map((x) => {

            // alert(name)
            if (x.customer_name.toUpperCase().match(re) != null || x.date.toUpperCase().match(re) != null) {
                // alert('hewre')
                temp1.push(x)
            }
        })
    }
    if (from == 'paymentlist') {
        // alert(JSON.stringify(data))
        data.map((x) => {
            let name = x.supplier_name ? x.supplier_name : x.customer_name
            // alert(name)
            if (x.from.toUpperCase().match(re) != null || x.date.toUpperCase().match(re) != null || name.toUpperCase().match(re) != null || x.details.toUpperCase().match(re) != null) {
                // alert('hewre')
                temp1.push(x)
            }
        })
    }
    return temp1
}