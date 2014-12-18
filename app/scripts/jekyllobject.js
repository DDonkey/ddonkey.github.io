function jekyllObject(str){
	if(!str){
		return null;
	}
	var obj = {};
	var lines = str.split('\n');
	var space = null;
	var parent = null;
	var child = null;
	for(var i in lines){
		if(!/^\s*$/.test(lines[i])){
			if(/^\s*#/.test(lines[i])){
				continue;
			}
			space = space===null ? lines[i].match(/^(\s*)\S/)[1] : space;
			if(space === lines[i].match(/^(\s*)\S/)[1]){
				var thisLine = lines[i].match(/^\s*(\S||\S[\s\S]*?\S)\s*:\s*(\S||\S[\s\S]*?\S)?\s*$/);
				if(!thisLine){
					obj[parent] = obj[parent] || [];
					obj[parent].push(lines[i]);
				}
				else if(thisLine[1] && thisLine[2]){
					obj[thisLine[1]] = thisLine[2];
					if(child && child.length && parent){
						obj[parent] = jekyllObject(child.join('\n'));
						parent = null;
						child = null;
					}
				}
				else if(thisLine[1] && !thisLine[2]){
					if(child && child.length && parent){
						obj[parent] = jekyllObject(child.join('\n'));
					}
					obj[thisLine[1]] = null;
					parent = thisLine[1];
					child = [];
				}
			}
			else{
				child.push(lines[i]);
			}
		}
	}
	if(child && child.length && parent){
		obj[parent] = jekyllObject(child.join('\n'));
	}
	return obj;
}