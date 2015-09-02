count=0
while IFS='' read -r line || [[ -n "$line" ]]; do
    wget -O 1/$count "$line"
	count=`expr $count + 1`
done < "$1"
