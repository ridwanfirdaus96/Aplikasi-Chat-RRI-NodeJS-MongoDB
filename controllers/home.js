module.exports = function (async, Studio, _) {
    return {
        SetRouting: function(router){
            router.get('/home', this.homePage);
        },

        homePage: function(req, res){
            async.parallel([
                function(callback){
                    Studio.find({}, (err, result) => {
                        callback(err, result);
                    })
                },

                function(callback){
                    Studio.aggregate([{
                        $group: {
                            "_id": "$role"
                        }
                    }], (err, newResult) => {
                        callback(err, newResult);
                    })
                }

            ], (err, results) => {
                const res1 = results[0];
                const res2 = results[1];
                // console.log(res2);
                
                const dataChunk = [];
                const chunkSize = 3;
                for (let i = 0; i < res1.length; i += chunkSize){
                    dataChunk.push(res1.slice(i, i+chunkSize));
                }
                const roleSort = _.sortBy(res2, '_id');

                res.render('home', {title: 'rri-chat - Home', data: dataChunk, role: roleSort});
            })
        }
    }
    
}