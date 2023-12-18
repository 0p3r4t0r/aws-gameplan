# Process files from
# https://aws.amazon.com/architecture/icons/

awsIconsPath='../assets/awsIcons'

rm -rf $awsIconsPath
cp -r $1 $awsIconsPath

if [ ${PWD##*/}  = 'pipeline' ]; then
    # remove everyting but the svgs
    find $awsIconsPath ! -name '*.svg' -type f -exec rm -f {} +

    # remove extra sizes
    for size in 16 32 48; do
        find $awsIconsPath -name "*$size" -type d -exec rm -rf {} +
    done

    # move files from the *64 directories to their parents
    find $awsIconsPath -name "*_64.svg" -type f -execdir mv {} ../ \;

    # remove empty directories
    find $awsIconsPath -name "*64" -type d -exec rmdir {} +

    # remove date from the ends of directories
    for i in $awsIconsPath/*; do
        mv $i ${i%_*}
    done
else
    echo "You are not in the right directory"
fi