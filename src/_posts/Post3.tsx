import PostBody from "@/ui/components/post/post-body";
import PostHeader from "@/ui/components/post/post-header";
import DistrictTable from "./post3/DistrictTable";

function Post3() {
    return (
        <>
            <PostHeader title={"Belem"}></PostHeader><PostBody>
                <p>Creating interactive geojson map</p>
            </PostBody>
            <DistrictTable></DistrictTable>
        </>
    )
}

export default Post3