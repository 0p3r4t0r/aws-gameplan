# Process files from
# https://aws.amazon.com/architecture/icons/

if [ ${PWD##*/}  = 'aws-gameplan' ]; then
    # remove everyting but the svgs
    find ./assets/awsIcons ! -name '*.svg' -type f -exec rm -f {} +

    # remove extra sizes
    for size in 16 32 48; do
        find ./assets/awsIcons -name "*$size" -type d -exec rm -rf {} +
    done

    # move files from the *64 directories to their parent directory
    # TODO: make this idempotent
    find ./assets/awsIcons -name "*_64.svg" -type f -execdir mv {} ../ \;

    # remove the empty directories
    find ./assets/awsIcons -name "*64" -type d -exec rmdir {} +
else
    echo "You are not in the right directory"
fi