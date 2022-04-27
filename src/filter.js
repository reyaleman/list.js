module.exports = function (list) {
  // Add handlers
  list.handlers.filterStart = list.handlers.filterStart || []
  list.handlers.filterComplete = list.handlers.filterComplete || []

  return function (filterFunction) {
    list.trigger('filterStart')
    list.i = 1 // Reset paging
    list.reset.filter()
    if (filterFunction === undefined) {
      list.filtered = false
    } else {
      list.filtered = true
      var is = list.items
      for (var i = 0, il = is.length; i < il; i++) {
        var item = is[i]
        
        var filtered = true
        if (Object.prototype.toString.call(filterFunction) === '[object Array]') {
          var f = 0
          while (f < filterFunction.length && filtered) {
            filtered = filterFunction[f](item)
            f++
          }
        } else {
          filtered = filterFunction(item)
        }
        
        item.filtered = filtered
      }
    }
    list.update()
    list.trigger('filterComplete')
    return list.visibleItems
  }
}
