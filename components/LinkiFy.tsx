import Link from 'next/link'
import React from 'react'
import { LinkIt, LinkItUrl } from 'react-linkify-it'
 interface LinkifyProps{
  children: React.ReactNode
 }
const LinkiFy = ({children}: LinkifyProps) => {
  return (
    <LinkiFyHashtag>
    <LinkiFyUser>
    <LinkifyUrl>{children}</LinkifyUrl>
    </LinkiFyUser>
    </LinkiFyHashtag>
  )
}

export default LinkiFy
function LinkifyUrl({children}: LinkifyProps){
  return <LinkItUrl className='text-primary hover:underline'>{children}</LinkItUrl>
}
function LinkiFyUser({children}: LinkifyProps){
  return <LinkIt regex={/(@[a-zA-Z0-9_-]+)/} component={(match, key)=>{
    return <Link key={key} href={'/users/'+match.slice(1)} className='text-primary hover:underline'>{match}</Link>
  }}>{children}</LinkIt>
}
function LinkiFyHashtag({children}: LinkifyProps){
  return <LinkIt regex={/(#[a-zA-Z0-9]+)/} component={(match, key)=>{
    return <Link key={key} href={'/hastag/'+match.slice(1)} className='text-primary hover:underline'>{match}</Link>
  }}>{children}</LinkIt>
}