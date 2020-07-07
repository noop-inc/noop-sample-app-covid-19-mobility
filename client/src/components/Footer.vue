<script>
import { BLink } from "bootstrap-vue";
export default {
    name: "Footer",

    render() {
        return (
            <footer class="footer-container">
                <div>
                    Designed by{" "}
                    <BLink href="https://www.rearc.io/" target="_blank">
                        Rearc
                    </BLink>
                </div>
                <div class="divider" />
                <div>
                    Built for{" "}
                    <BLink href="https://noop.app/" target="_blank">
                        Noop
                    </BLink>
                </div>
            </footer>
        );
    }
};
</script>

<style lang="scss">
.footer-container {
    text-align: center;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    font-size: 12px;
    line-height: 12px;
    margin: 9px 0;

    div {
        display: inline-block;
        font-weight: 400;
    }

    div:first-of-type {
        padding-right: 16px;
    }

    div:last-of-type {
        padding-left: 16px;
    }

    .divider {
        height: 12px;
        vertical-align: top;
        border-right: var(--light) solid 1px;
    }

    div,
    a {
        color: var(--light);
        text-shadow: 1px 1px var(--dark);
    }

    a {
        font-weight: 600;
    }

    a:hover {
        color: white;
    }
}
</style>