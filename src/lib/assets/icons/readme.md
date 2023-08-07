To add new icon to assets, icon needs to undergo "process".
Steps to execute:

1.  Minify svg asset with [Vecta](https://vecta.io/nano) or [iLoveIMG Minifier](https://www.iloveimg.com/compress-image/compress-svg)

2.  Resize to (ideally) **24x24** or if that's not possible, the longer side should be **max 24px**. Resizing can be done with [iLoveImg Resizing tool](https://www.iloveimg.com/resize-image/resize-svg). Also viewport should be **0 0 24 24**

3.  Make sure main parts of svg have **fill="currentcolor"** attribute with value and also **class={$$props.class}>** so you can pass class directly to svg.
